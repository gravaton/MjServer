# Install base packages

packages = %w[
    nodejs-legacy
    git
]

packages.each { |pkg|
    package pkg do
        action :install
    end
}
