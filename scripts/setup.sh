#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR

echo "🧬 Setting up repository tooling for a seamless eng experience..."
echo "---------------------------------------------------------------------------------------"

function command_exists {
    command -v "${1}" &>/dev/null
}

# Function to extract version from package.json and remove '^' or '~' characters
extract_version_from_package() {
    local engine_name=$1
    jq -r ".engines.${engine_name}" < package.json | tr -d '^~'
}


# Function to update the version for the given tool in .tool-versions
update_tool_version() {
    local tool_name=$1
    local tool_version=$2

    echo "🔧 Updating ${tool_name} to version ${tool_version} in .tool-versions"

    sed "s/${tool_name}.*/${tool_name} ${tool_version}/g" .tool-versions > .tool-versions.tmp
    mv .tool-versions.tmp .tool-versions
}

if ! command_exists asdf; then
  echo "🚨 Command 'asdf' is missing. Please install by following the instructions at https://asdf-vm.com/guide/getting-started.html"
  exit 1
fi

# Install brew packages
brew install \
  jq \
  gum \

# Ensure asdf plugins are installed
asdf plugin add nodejs || true
asdf plugin add pnpm || true

# Ensure .tool-versions is up to date
node_version="$(extract_version_from_package "node")"
pnpm_version="$(extract_version_from_package "pnpm")"

update_tool_version "nodejs" "${node_version}"
update_tool_version "pnpm" "${pnpm_version}"

asdf install

# Setup Vercel CLI
echo "⚫️ Installing latest Vercel CLI..."
pnpm i -g vercel@latest

# Finalize
echo "--------------------------------------------------"
echo "🚀 Setup completed successfully. Happy creating 🎉"
