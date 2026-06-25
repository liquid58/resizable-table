(function ($) {

    $.fn.resizableTable = function (options) {

        var settings = $.extend({
            minWidth: 60,
            saveState: true,
            storagePrefix: "rtc"
        }, options);

        return this.each(function () {

            var $table = $(this);

            if (!$table.attr("id")) {
                console.error("ResizableTable: table id required");
                return;
            }

            var tableId = $table.attr("id");

            var storageKey =
                settings.storagePrefix +
                "_widths_" +
                location.pathname +
                "_" +
                tableId;

            loadWidths();

            $table.find("thead th").each(function (index) {

                var $th = $(this);
                 if (!$th.find(".rtc-text").length) {

        var text = $th.html();

        $th.html(
            '<span class="rtc-text">' +
            text +
            '</span>'
        );

        $th.attr(
            "title",
            $th.text().trim()
        );
    }

    if ($th.find(".rtc-handle").length)
        return;

    $th.append(
        '<div class="rtc-handle"></div>'
    );

                if ($th.find(".rtc-handle").length)
                    return;

                $th.css("position", "relative");

                $th.append(
                    '<div class="rtc-handle"></div>'
                );

                $th.find(".rtc-handle")
                    .on("mousedown", function (e) {

                        e.preventDefault();

                        var startX = e.pageX;
                        var startWidth =
                            $th.outerWidth();

                        $(document)
                            .on(
                                "mousemove.rtc",
                                function (e) {

                                    var width =
                                        startWidth +
                                        (e.pageX -
                                            startX);

                                    width = Math.max(
                                        width,
                                        settings.minWidth
                                    );

                                    applyWidth(
                                        index,
                                        width
                                    );
                                }
                            )
                            .on(
                                "mouseup.rtc",
                                function () {

                                    $(document)
                                        .off(
                                            ".rtc"
                                        );

                                    saveWidths();
                                }
                            );
                    });
            });

            function applyWidth(
                columnIndex,
                width
            ) {

                $table.find("tr").each(function () {

                    $(this)
                        .children()
                        .eq(columnIndex)
                        .css({
                            width:
                                width + "px",
                            minWidth:
                                width + "px",
                            maxWidth:
                                width + "px"
                        });
                });
            }

            function saveWidths() {

                if (!settings.saveState)
                    return;

                var widths = [];

                $table
                    .find("thead th")
                    .each(function () {

                        widths.push(
                            $(this)
                                .outerWidth()
                        );
                    });

                localStorage.setItem(
                    storageKey,
                    JSON.stringify(widths)
                );
            }

            function loadWidths() {

                if (!settings.saveState)
                    return;

                var saved =
                    localStorage.getItem(
                        storageKey
                    );

                if (!saved)
                    return;

                try {

                    var widths =
                        JSON.parse(saved);

                    widths.forEach(
                        function (
                            width,
                            index
                        ) {

                            applyWidth(
                                index,
                                width
                            );
                        }
                    );

                } catch (e) {
                    console.log(e);
                }
            }

            $table[0].resetColumnWidths =
                function () {

                    localStorage.removeItem(
                        storageKey
                    );

                    location.reload();
                };
        });
    };

})(jQuery);
