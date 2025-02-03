import { PluginOption } from "vite";

import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import eslint from "vite-plugin-eslint";

const plugins = (mode: string): PluginOption[] => {
    return [
        react({ include: "pathToAllReactFiles.{jsx,tsx}" }),
        basicSsl(),
        // Eslint Config
        eslint({
                failOnError: boolean,
                failOnWarning: boolean,
                emitError: boolean,
                emitWarning: boolean,
                useEslintrc: boolean, // Incase you already have eslintrc in the app
        })
    ];
};

export default plugins;