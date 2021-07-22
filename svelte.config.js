import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
//import node from "@sveltejs/adapter-node";
// import sveltePreprocess from 'svelte-preprocess';
// import { coffeescript, } from 'svelte-preprocess';
// console.log( '^889734^', coffeescript );
import coffeescript from 'coffeescript';
// console.dir( coffeescript );
// console.dir( coffeescript.compile );

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

  // preprocess: sveltePreprocess({
  preprocess: preprocess({
    coffeescript( { content, filename, options } ){
      const coffee_cfg = {
          filename,
          bare: true,
          sourceMap: true,
          ...options, };
      const { js: code, v3SourceMap: map } = coffeescript.compile( content, coffee_cfg, );
      console.log( '^7336^', { code, map, } );
      return { code, map };
      // return { code, };
      },
    potato( { content, filename, options } ) {
      // const { code, map } = require('potato-language').render(content);
      // return { code, map };
      return { code: content, };
      },
  }),
  // preprocess: preprocess( input, [
  // coffeescript(),
  // ]
  // ),

};
