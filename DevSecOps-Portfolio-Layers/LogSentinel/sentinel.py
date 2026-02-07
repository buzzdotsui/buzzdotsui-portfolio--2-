import re
import time
import subprocess
import os
from collections import defaultdict

# Configuration
LOG_FILE = "/var/log/auth.log"  # Typical location on Debian/Ubuntu
MAX_RETRIES = 3
BAN_TIME = 3600

# Simple in-memory tracker
failed_attempts = defaultdict(int)

def tail_f(filename):
    """Generator that yields new lines from a file"""
    # For Windows/Portfolio demo, simulate reading lines
    if os.name == 'nt':
        print("[*] Running in Windows Demo Mode. Simulating log stream...")
        simulated_logs = [
            "Failed password for invalid user admin from 192.168.1.50 port 4432 ssh2",
            "Failed password for root from 192.168.1.50 port 4434 ssh2",
            "Failed password for root from 192.168.1.50 port 4436 ssh2", # 3rd time -> BAN
            "Accepted publickey for user ubuntu from 10.0.0.5 port 5566 ssh2"
        ]
        for line in simulated_logs:
            time.sleep(1)
            yield line
        return

    f = subprocess.Popen(['tail', '-F', filename], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    while True:
        line = f.stdout.readline()
        if line:
            yield line.decode('utf-8').strip()

def ban_ip(ip):
    """Executes iptables command to ban IP"""
    print(f"[🚨 BLOCKING] Banning IP: {ip}")
    # Command: sudo iptables -A INPUT -s {ip} -j DROP
    # We print it for safety/demo purposes
    print(f"Executed: sudo iptables -A INPUT -s {ip} -j DROP")

def process_log(line):
    # Pattern for SSH failed password
    # Feb  7 12:00:00 server sshd[123]: Failed password for invalid user admin from 1.2.3.4...
    match = re.search(r"Failed password for .* from (\d+\.\d+\.\d+\.\d+)", line)
    
    if match:
        ip = match.group(1)
        failed_attempts[ip] += 1
        print(f"[!] Warning: Failed login from {ip} ({failed_attempts[ip]}/{MAX_RETRIES})")
        
        if failed_attempts[ip] >= MAX_RETRIES:
            ban_ip(ip)
            del failed_attempts[ip] # Reset counter after ban

if __name__ == "__main__":
    print("🛡️ LogSentinel Active. Monitoring for brute-force patterns...")
    try:
        for line in tail_f(LOG_FILE):
            process_log(line)
    except KeyboardInterrupt:
        print("\n[!] Stopping Sentinel.")
