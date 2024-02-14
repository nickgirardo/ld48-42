{
  description = "ld48 42";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/release-23.11";
    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, gitignore }:
    let
      allSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f {
        inherit system;
        pkgs = import nixpkgs { inherit system; };
      });
    in {
      packages = forAllSystems ({ pkgs, ... }: rec {
        default = ld4842;
        ld4842 = pkgs.buildNpmPackage {
          name = "ld48 42";
          src = gitignore.lib.gitignoreSource ./.;
          npmDepsHash = "sha256-ZRTaGb3zJjE490QzbyTU9yz1Fd9ikGr9q+Wqg+0vvfg=";
          installPhase = ''
            mkdir -p $out/dist
            cp -r dist/ $out/
          '';
        };
      });
    };
}
