#!/bin/bash
# Bootstrap script for Project Cipher
# Usage: ./bootstrap.sh

set -e

echo "🔒 Starting Project Cipher Hardening Sequence..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Please run as root."
  exit 1
fi

# Check if Ansible is installed
if ! command -v ansible &> /dev/null
then
    echo "⚠️ Ansible not found. Installing..."
    apt update && apt install -y ansible
else
    echo "✅ Ansible detected."
fi

# Run the playbook locally
if [ -f "playbooks/site.yml" ]; then
    echo "🚀 Applying security configurations..."
    ansible-playbook -i "localhost," -c local playbooks/site.yml
else
    echo "❌ Playbook not found at playbooks/site.yml"
    exit 1
fi

echo "✅ Hardening Complete. Server is now CIS compliant."
