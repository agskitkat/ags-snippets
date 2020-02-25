$(function() {

    var hashMenuController = {
        names: {
            root: ".s-catalog-mobile-menu",
            back: ".menu-back-link",
            viewport: '#menu_viewport',
        },
        hash: "",
        historystack: [],
        init: function() {
            this.hash = window.location.hash;
            if(this.isMenuHash()) {
                this.openMenu();
            }
            $(window).on( 'hashchange', function( e ) {
                this.hash = window.location.hash;
                console.log("hashchange", this.hash);
                // если нет хешьега - закрываем меню
                if(this.hash === "") {
                    this.closeMenu();
                    return true;
                }
                console.log("passed", this.hash);
                // перейти к новому списку меню,
                // при необходимости открыть
                this.openMenu();
            }.bind(this));
            $(this.names.back).click(function () {
                window.history.back();
            })
        },
        isMenuHash: function() {
            // Определяем, является ли коммандой меню
            var re = /^#menu_(\d_?){0,}$/;
            return this.hash.match(re);
        },
        openMenu: function() {
            this.getDataLinks();
            // Бодейка без скролла.
            $('body').css({overflow:'hidden'});
            // Видимость стрелки "назад"
            if(this.hash === "#menu_0") {
                $(this.names.root).find(this.names.back).addClass('hidden');
            } else {
                $(this.names.root).find(this.names.back).removeClass('hidden');
            }
            $(this.names.root).addClass('active');
            $(this.hash).addClass('active');
            return true;
        },
        closeMenu: function() {
            $('body').css({overflow:'initial'});
            $(this.names.root).removeClass('active');
        },
        getDataLinks: function() {
            console.log("getDataLinks", this.hash,  $(this.hash + " > li > a"));
            $(this.names.viewport).addClass("hidden");
            setTimeout(function(){
                $(this.names.viewport).html('');
                $(this.hash + " > li > a").each(function(k, v){
                    var elem = v.cloneNode(true);
                    var li = document.createElement('li');
                    li.appendChild(elem);
                    $(this.names.viewport).append(li);
                }.bind(this));

                $(this.names.viewport).removeClass("hidden");
            }.bind(this), 400);
        }
    };

    hashMenuController.init();
});