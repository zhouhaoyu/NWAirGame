// 用于TypeScript强制类型转换
var _$ = function (a) {
    return a;
};
var _ = function (a) {
    return a;
};
var dummy = {};
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
/*
 * 让地图平滑移动的控制器。
 */
var MapMovementController = (function () {
    function MapMovementController() {
        this.pressedDir = {};
        this.pressedCount = 0;
    }
    MapMovementController.prototype.setDir = function (direction, pressed) {
        if (this.pressedDir[direction] == true && pressed == false) {
            this.pressedDir[direction] = false;
            if (--this.pressedCount == 0) {
                clearInterval(this.timUpdateMap);
                this.timUpdateMap = null;
            }
        }
        else if (!this.pressedDir[direction] && pressed == true) {
            this.pressedDir[direction] = true;
            if (this.pressedCount++ == 0) {
                this.timUpdateMap = setInterval(MapMovementController.moveMap, 30, this);
            }
        }
    };
    MapMovementController.moveMap = function (curr) {
        var offset = ui.dMapInner.offset();
        if (curr.pressedDir[0 /* Up */] == true)
            if (offset.top <= 0)
                TweenMax.to(ui.dMapInner, 0.1, { bottom: "-=25" });
            else
                curr.setDir(0 /* Up */, false);
        if (curr.pressedDir[2 /* Down */] == true)
            if (parseFloat(ui.dMapInner.css("bottom")) <= 0)
                TweenMax.to(ui.dMapInner, 0.1, { bottom: "+=25" });
            else
                curr.setDir(2 /* Down */, false);
        if (curr.pressedDir[3 /* Left */] == true)
            if (offset.left <= 0)
                TweenMax.to(ui.dMapInner, 0.1, { left: "+=25" });
            else
                curr.setDir(3 /* Left */, false);
        if (curr.pressedDir[1 /* Right */] == true)
            if (offset.left + ui.dMapInner.width() >= ui.dMapOuter.width())
                TweenMax.to(ui.dMapInner, 0.1, { left: "-=25" });
            else
                curr.setDir(1 /* Right */, false);
    };
    return MapMovementController;
})();
var ui = {
    dGameMenu: null,
    dIntro: null,
    gameDisplay: null,
    lstMessages: null,
    lstLoadProgress: null,
    lstSaveProgress: null,
    mnuMainMenu: null,
    dlgModal: null,
    dCredits: null,
    dlgLoadProgress: null,
    dlgSaveProgress: null,
    dLoading: null,
    dGameMain: null,
    panPlayControl: null,
    dMapInner: null,
    dMapView: null,
    dMapOuter: null,
    dAnimMask: null,
    dStatusInfo: null
};
// 辅助函数所在的静态类
var Helpers = (function () {
    function Helpers() {
    }
    Helpers.shakeProperties = function (obj, amplitude, additionalProperties) {
        var result = {};
        for (var key in obj) {
            var val = obj[key];
            result[key] = val + (Math.random() * amplitude * 2 - amplitude);
        }
        for (var key in additionalProperties)
            result[key] = additionalProperties[key];
        return result;
    };
    /*
     * @param upperBound 不包含该边界
     */
    Helpers.randBetween = function (lowerBound, upperBound, integer) {
        var result = Math.random() * (upperBound - lowerBound) + lowerBound;
        if (integer)
            return Math.floor(result);
        return result;
    };
    Helpers.dateToString = function (date) {
        var min = date.getMinutes(), sec = date.getSeconds();
        if (min < 10)
            min = "0" + min;
        if (sec < 10)
            sec = "0" + sec;
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + min + ":" + sec;
    };
    Helpers.getParticlesAnimation = function (container) {
        var particlesTimeline = new TimelineLite(), i = 150, radius = 900, dots = [], rawDots = [];
        while (--i > -1) {
            var dot = $("<figure class=\"centered\" id=\"dot" + i + "\">·</figure>");
            container.append(dot);
            var angle = Math.random() * Math.PI * 2, insertionTime = i * 0.015;
            particlesTimeline.from(dot, .2, { opacity: 0 }, insertionTime + 0.4);
            particlesTimeline.to(dot, 1.5, {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                width: 32,
                height: 32,
                ease: Cubic.easeIn
            }, insertionTime).to(dot, 0.1, { opacity: 0 }, insertionTime + 1.4);
        }
        return particlesTimeline;
    };
    Helpers.keyCodes = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        KEY_0: 48,
        KEY_1: 49,
        KEY_2: 50,
        KEY_3: 51,
        KEY_4: 52,
        KEY_5: 53,
        KEY_6: 54,
        KEY_7: 55,
        KEY_8: 56,
        KEY_9: 57,
        KEY_A: 65,
        KEY_B: 66,
        KEY_C: 67,
        KEY_D: 68,
        KEY_E: 69,
        KEY_F: 70,
        KEY_G: 71,
        KEY_H: 72,
        KEY_I: 73,
        KEY_J: 74,
        KEY_K: 75,
        KEY_L: 76,
        KEY_M: 77,
        KEY_N: 78,
        KEY_O: 79,
        KEY_P: 80,
        KEY_Q: 81,
        KEY_R: 82,
        KEY_S: 83,
        KEY_T: 84,
        KEY_U: 85,
        KEY_V: 86,
        KEY_W: 87,
        KEY_X: 88,
        KEY_Y: 89,
        KEY_Z: 90,
        LEFT_META: 91,
        RIGHT_META: 92,
        SELECT: 93,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUM_LOCK: 144,
        SCROLL_LOCK: 145,
        SEMICOLON: 186,
        EQUALS: 187,
        COMMA: 188,
        DASH: 189,
        PERIOD: 190,
        FORWARD_SLASH: 191,
        GRAVE_ACCENT: 192,
        OPEN_BRACKET: 219,
        BACK_SLASH: 220,
        CLOSE_BRACKET: 221,
        SINGLE_QUOTE: 222
    };
    return Helpers;
})();
// 使得元素可拖动
$.fn.makeDraggable = function () {
    return this.each(function () {
        var $this = $(this);
        if ($this.draggable)
            return;
        var offset = null;
        $this.mousedown(function (e) {
            if (e.target.tagName == "BUTTON")
                return;
            offset = {
                x: parseFloat($this.css("left")) - e.clientX,
                y: parseFloat($this.css("top")) - e.clientY
            };
        }).mousemove(function (e) {
            if (offset)
                $this.css({
                    left: offset.x + e.clientX,
                    top: offset.y + e.clientY
                });
        }).mouseup(function (e) { return offset = null; });
        $this.draggable = true;
    });
};
// 居中指定元素
$.fn.center = function () {
    return this.each(function () {
        var $this = $(this);
        $this.css({
            top: ($this.parent().height() - $this.height()) / 2,
            left: ($this.parent().width() - $this.width()) / 2
        });
    });
};
function ReloadCSS() {
    var css = $("#lnkAppCSS")[0];
    css.href = css.href.replace(/\?.*|$/, "?" + Math.random());
}
//# sourceMappingURL=helpers.js.map