module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    }
};