require(["dojox/validate/web", 'dojo/dom'], function(validate, dom) {
    validate.isEmailAddress(dom.byId("email"));
});