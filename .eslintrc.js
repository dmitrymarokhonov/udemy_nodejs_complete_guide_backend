module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "extends": ["eslint:recommended", "plugin:node/recommended", "airbnb-base", "prettier"],
    "plugins": ["prettier"],
    "rules": {
        "import/prefer-default-export": ["off"],
        "no-plusplus": ["off"],
        "node/no-missing-import": ["error", {
            "tryExtensions": [".js", ".mjs"]
        }],
        "prettier/prettier": ["error"]
    }
}