define([
    // The dojo/dom module is required by this module, so it goes
    // in this list of dependencies.
    'dojo/dom',
    'dojo/fx',
    'dojo/domReady!'
],

function (dom, fx) {   // The piece we had before...

        return {
            setTextfx: function (id, text) {
                var node = dom.byId(id);
                node.innerHTML = text;
                        // ...but now, with an animation!
                fx.slideTo({
                node: greeting,
                top: 100,
                left: 200
                }).play();
            },
    

}