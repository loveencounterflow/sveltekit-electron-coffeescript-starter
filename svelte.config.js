import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
//import node from "@sveltejs/adapter-node";
import coffeescript from 'coffeescript';

const dev = process.env.NODE_ENV == "development"

export default {
  kit: {

    //adapter: node()
    adapter: adapter(),
    target: "#svelte",

    vite: {
      compilerOptions: { dev },
    }
  },

  preprocess: preprocess({
    coffeescript( { content, filename, options } ){
      const coffee_cfg = {
          filename,
          bare: true,
          sourceMap: true,
          ...options, };
      const { js: code, v3SourceMap: map } = coffeescript.compile( content, coffee_cfg, );
      return { code, map };
      },
    potato( { content, filename, options } ) {
      // const { code, map } = require('potato-language').render(content);
      // return { code, map };
      return { code: content, };
      },
  }),

};
