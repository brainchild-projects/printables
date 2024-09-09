{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "Printables";

  # https://devenv.sh/packages/
  packages = with pkgs; [
    nodejs_20
  ];

  # https://devenv.sh/scripts/
  scripts.hello.exec = "echo $GREET";

  enterShell = ''
    hello
  '';

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    npm test
  '';

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
  };

  processes.serve.exec = "npm start";
}
