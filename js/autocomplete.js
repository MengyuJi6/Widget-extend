$(function () {
    $.widget("ui.autocomplete", $.ui.autocomplete, {
        options: $.extend({}, this.options, {
            categorize: false,
            createHolder: true,
            holderSuffix: '_holder',
            holderSelector: '',
            placeholderText: ''
        }),
        _create: function () {
            this._super();

            if (this.options.createHolder && this.options.holderSelector == '') {
                this.element.parent().append($('<input type="hidden" id="' + this.element.attr('id') + this.options.holderSuffix + '" value="">'));
                this.options.holderSelector = '#' + this.element.attr('id') + this.options.holderSuffix;
            }

            var o = this.options,
                elm = this.element;
            elm.val(o.placeholderText);

            elm.bind({
                "focus.autocomplete": function (e) {
                    e.preventDefault();
                    // clear the input value
                    elm.val("");
                    $(o.holderSelector).val("");
                },

                    "blur.autocomplete": function (e) {
                    e.preventDefault();
                    if ($(o.holderSelector).val() == "") elm.val(o.placeholderText);
                }
            }).trigger("change");

            var savedFuncs = {
                open: o.open,
                close: o.close,
                focus: o.focus,
                select: o.select
            }

            o.open = function (e, ui) {
                $(o.holderSelector).val("");
                if (typeof savedFuncs.open == "function") return savedFuncs.open(e, ui);
                else return false;
            };

            o.close = function (e, ui) {
                this.term = null;
                if (typeof savedFuncs.close == "function") return savedFuncs.close(e, ui);
                else return false;
            };

            o.focus = function (e, ui) {
                elm.val(ui.item.label);
                if (typeof savedFuncs.focus == "function") return savedFuncs.focus(e, ui);
                else return false;
            }

            o.select = function (e, ui) {
                $(o.holderSelector).val(ui.item.value);
                elm.val(ui.item.label);
                //triggering change updates the validator .
                elm.trigger("change");
                if (typeof savedFuncs.select == "function") return savedFuncs.select(e, ui);
                else return false;
            };

            return this;
        },
        _renderMenu: function (ul, items) {
            if (!this.options.categorize) return this._super(ul, items);

            var self = this,
                currentCategory = "";
            $.each(items, function (index, item) {
                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                self._renderItemData(ul, item);
            });
        },
        value: function () {
            return $(this.options.holderSelector).val();
        }
    });

var data = [{
    label: "aaron",
    value: "v1",
    category: "Finance"
}, {
    label: "antonio",
    value: "v2",
    category: "Finance"
}, {
    label: "arthur",
    value: "v3",
    category: "Engineering"
}, {
    label: "ardian",
    value: "v4",
    category: "Product Management"
}, {
    label: "alejandro",
    value: "v5",
    category: "Product Management"
}, {
    label: "adonis",
    value: "v6",
    category: "Data Science"
}, {
    label: "anders andersson",
    value: "v7",
    category: "Data Science"
}, {
    label: "andres andersson",
    value: "v8",
    category: "Healthcare"
}, {
    label: "andreas johnson",
    value: "v9",
    category: "Healthcare"
}];

// $("input:text").autocomplete({
//     source: data,
//     categorize: true,
//     placeholderText: 'Type here'
// });


$("#data").autocomplete({
    source: data,
    categorize: true,
    placeholderText: 'eg. a'
});

// $("input:button").on('click', function (e) {
//     e.preventDefault();
//     $(this).val($("input:text").first().autocomplete("value"));
// });
});

