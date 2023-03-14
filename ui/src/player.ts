import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
  toVNode,
  VNode,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

let vnode: VNode;

interface PlayerLight {
  id: number;
  name: string;
}

const handleInput = (e: any) => {
  autocomplete(e.target.value);
};

const view = (players: PlayerLight[]) => {
  return h(
    "div",
    {
      class: {},
    },
    [
      h(
        "div",
        h("input", {
          props: {
            spellcheck: "false",
            autocomplete: "off",
            placeholder: "Search",
            enterkeyhint: "search",
          },
          on: {
            input: handleInput,
          },
        })
      ),
      players && players.length != 0
        ? h(
            "div",
            { class: { "search-results": true } },
            players.map((player) =>
              h(
                "a",
                {
                  class: {
                    link: true,
                  },
                  props: {
                    href: `/player/${player.id}`,
                  },
                },
                [h("br"), player.name]
              )
            )
          )
        : null,
    ]
  );
};

const autocomplete = (term: string) =>
  term.length >= 3
    ? fetch(
        "/api/search?t=player&" +
          new URLSearchParams({
            t: "player",
            q: term,
          })
      ).then((resp) =>
        resp.json().then((players: PlayerLight[]) => {
          console.log(players);
          vnode = patch(vnode, view(players));
        })
      )
    : (vnode = patch(vnode, view([])));

window.addEventListener("DOMContentLoaded", () => {
  vnode = patch(
    toVNode(document.querySelector(".search-container")!),
    view([])
  );
});
