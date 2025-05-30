let terminal = {
    print: console.log,
    err: console.error,
    warn: console.warn,
    info: console.info,
    cls: console.clear,
    ask: prompt
}; let MsgBox = {
    warn: alert,
    question: confirm
}; let bool = {
    eOr: function(a, b) {
        return a || b;
    },
    eAnd: function(a, b) {
        return a && b;
    },
    not: function(a) {
        return !a;
    },
    eEqual: function(a, b) {
        return a == b;
    },
    eNotEqual: function(a, b) {
        return a != b;
    },
    eMore: function(a, b) {
        return a > b;
    },
    eLess: function(a, b) {
        return a < b;
    },
    eGreater: function(a, b) {
        return a >= b;
    },
    eNotGreat: function(a, b) {
        return a <= b;
    },
    xor: function(a, b) {
        return (!!a) !== (!!b);
    }
};