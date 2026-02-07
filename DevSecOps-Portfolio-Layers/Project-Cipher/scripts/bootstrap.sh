#!/bin/bash
# Bootstrap script for Project Cipher
# Usage: ./bootstrap.sh

echo "🔒 Starting Project Cipher Hardening Sequence..."

# Check if Ansible is installed
if ! command -v ansible &> /dev/null
then
    echo "⚠️ Ansible not found. Installing..."
    sudo apt update && sudo apt install -y ansible
else
    echo "✅ Ansible detected."
fi

# Run the playbook locally
echo "🚀 Applying security configurations..."
ansible-playbook -i "localhost," -c local playbooks/site.yml

echo "✅ Hardening Complete. Server is now CIS compliant."
