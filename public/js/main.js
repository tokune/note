$(function() {
    var Colorer = function() {
        this.num = 0;
    }
    Colorer.prototype.col = function() {
        if (this.num > 210) return '#ffdc00'; 
        this.num += 20;
        var g = this.num.toString(16);
        var rgb = '#ff' + g + '00';
        return rgb;
    }
    var paintBG = function() {
        var packer = new Colorer();
        var border_packer = new Colorer();
        for (var i = 0; i < 3; i++) {
            border_packer.col(); 
        };
        var cat = $('.left-nav ul li');
        for (var i = 0; i < cat.length; i++) {
            var rgb = '#ff0000';
            if (cat.length < 11 || i > cat.length - 11) {
                rgb = packer.col();
            }
            cat[i].style.background = rgb;
            cat[i].style.borderBottom = '1px solid ' + border_packer.col();
        };
    }
    $('.main').on('paste', '.content .note', function(e) {
        var event = e.originalEvent; 
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== 0) continue;

            var blob = items[i].getAsFile();
            var reader = new FileReader();

            reader.onload = function(event){
              var img = document.createElement('img');
              img.setAttribute('src', event.target.result);
              if (window.getSelection) {
                  var sel = window.getSelection();
                  if (sel.getRangeAt && sel.rangeCount) {
                      var range = sel.getRangeAt(0);
                      range.deleteContents();
                      range.insertNode(img);
                  }
              } else if (document.selection && document.selection.type != "Control") {
                  //ie<9
                  document.selection.createRange().pasteHTML(img);
              }
            };

            reader.readAsDataURL(blob);
        };
    })
    $('.left-nav ul').on('click', '.add-note', function(e) {
        cleanTitleLi(); 
        var li_element = document.createElement('li');
        var a_element = document.createElement('a');
        a_element.setAttribute('href', '#/note/0');
        li_element.setAttribute('current', 'true');
        li_element.setAttribute('draggable', 'true');
        li_element.setAttribute('data-id', '0');
        a_element.appendChild(li_element);
        $('.add-note').after(a_element);
        paintBG(); 
    });
    $('.left-nav ul').on('click', 'li', function(e) {
        if (e.target.hasAttribute('adder')) return;
        cleanTitleLi();
        e.target.setAttribute('current', 'true');
    });
    $('.left-nav ul').on('click', 'li', function(e) {
        if (e.target.hasAttribute('adder')) return;
        cleanTitleLi(); 
        e.target.setAttribute('current', 'true');
    });
    var cleanTitleLi = function() {
        var targets = $('li[current|=\'true\']');
        targets.removeAttr('current');
    }
    $('.main').on('click', '.box .btns .discard', function(e) {
        var target = $('li[current|=\'true\']');
        if (target.parent() && target.parent()[0] && target.parent()[0].hash === '#/note/0') target.parent().remove();
    })
    paintBG(); 

});
