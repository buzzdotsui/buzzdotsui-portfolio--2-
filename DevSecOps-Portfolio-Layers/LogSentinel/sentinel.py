
import re
import time
import subprocess
import os
import argparse
import logging
from collections import defaultdict
from typing import Generator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("LogSentinel")

class LogSentinel:
    def __init__(self, log_file: str, max_retries: int, ban_time: int, dry_run: bool):
        self.log_file = log_file
        self.max_retries = max_retries
        self.ban_time = ban_time
        self.dry_run = dry_run
        self.failed_attempts = defaultdict(int)

    def tail_f(self) -> Generator[str, None, None]:
        """Generator that yields new lines from a file"""
        # For Windows/Portfolio demo, or if file doesn't exist, simulate reading lines
        if os.name == 'nt' or not os.path.exists(self.log_file):
            logger.info(f"[*] Running in Demo Mode. Simulating log stream from {self.log_file}...")
            simulated_logs = [
                "Failed password for invalid user admin from 192.168.1.50 port 4432 ssh2",
                "Failed password for root from 192.168.1.50 port 4434 ssh2",
                "Failed password for root from 192.168.1.50 port 4436 ssh2", # 3rd time -> BAN
                "Accepted publickey for user ubuntu from 10.0.0.5 port 5566 ssh2",
                "Failed password for user deploy from 10.0.0.88 port 5678 ssh2",
                "Failed password for user deploy from 10.0.0.88 port 5679 ssh2",
                "Failed password for user deploy from 10.0.0.88 port 5680 ssh2", # BAN
            ]
            for line in simulated_logs:
                time.sleep(1.5)
                yield line
            
            # Keep alive for demo
            while True:
                time.sleep(5)
                yield "-- heartbeat --"
            return

        try:
            f = subprocess.Popen(['tail', '-F', self.log_file], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            while True:
                line = f.stdout.readline()
                if line:
                    yield line.decode('utf-8').strip()
        except FileNotFoundError:
             logger.error(f"Log file not found: {self.log_file}")
             # Fallback to demo mode logic locally if needed, or just exit. 
             # For this script, we'll exit if not in Windows/Demo mode.
             return

    def ban_ip(self, ip: str):
        """Executes iptables command to ban IP"""
        logger.warning(f"[🚨 BLOCKING] Threshold reached for IP: {ip}")
        command = f"sudo iptables -A INPUT -s {ip} -j DROP"
        
        if self.dry_run or os.name == 'nt':
            logger.info(f"[DRY RUN] Would execute: {command}")
        else:
            try:
                subprocess.run(command.split(), check=True)
                logger.info(f"Successfully banned {ip}")
            except subprocess.CalledProcessError as e:
                logger.error(f"Failed to ban {ip}: {e}")

    def process_log(self, line: str):
        # Pattern for SSH failed password
        # Feb  7 12:00:00 server sshd[123]: Failed password for invalid user admin from 1.2.3.4...
        # Adjusted regex to be more flexible
        match = re.search(r"Failed password for .* from (\d+\.\d+\.\d+\.\d+)", line)
        
        if match:
            ip = match.group(1)
            self.failed_attempts[ip] += 1
            logger.warning(f"Failed login attempt from {ip} ({self.failed_attempts[ip]}/{self.max_retries})")
            
            if self.failed_attempts[ip] >= self.max_retries:
                self.ban_ip(ip)
                del self.failed_attempts[ip] # Reset counter after ban
        elif "Accepted publickey" in line:
             match_success = re.search(r"from (\d+\.\d+\.\d+\.\d+)", line)
             if match_success:
                 ip = match_success.group(1)
                 # Optional: Reset failure count on success if desired
                 if ip in self.failed_attempts:
                     del self.failed_attempts[ip]
                 logger.info(f"Successful login from {ip}")

def main():
    parser = argparse.ArgumentParser(description="LogSentinel: Real-Time Intrusion Detection System")
    parser.add_argument("--log-file", default="/var/log/auth.log", help="Path to log file to monitor")
    parser.add_argument("--max-retries", type=int, default=3, help="Max failed attempts before ban")
    parser.add_argument("--ban-time", type=int, default=3600, help="Ban duration in seconds (not implemented in simple version)")
    parser.add_argument("--dry-run", action="store_true", help="Simulate actions without modifying firewall")
    
    args = parser.parse_args()
    
    sentinel = LogSentinel(args.log_file, args.max_retries, args.ban_time, args.dry_run)
    
    logger.info("🛡️ LogSentinel Active. Monitoring for brute-force patterns...")
    try:
        for line in sentinel.tail_f():
            sentinel.process_log(line)
    except KeyboardInterrupt:
        logger.info("\nStopping Sentinel.")

if __name__ == "__main__":
    main()
