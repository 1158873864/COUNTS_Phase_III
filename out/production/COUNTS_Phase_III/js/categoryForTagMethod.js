function DropDownForTagMethod(box) {
    this.dd = box;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDownForTagMethod.prototype = {
    initEvents : function() {
        var obj = this;
        obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            return false;
        });
        obj.opts.on('click',function(){

            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);

            //ɾ��ԭ��ѡ�б��
            $('#dropdownItemsForTagMethod li a i').removeClass("fa fa-check");
            //���Ϊѡ����
            $(this.firstChild.firstChild).addClass("fa fa-check");

        });
    },
    getValue : function() {
        return this.val;
    },
    getIndex : function() {
        return this.index;
    },
    reset: function() {
        //$("#defaultCategory").click();
        this.dd.find('ul.dropdown > li')[0].click();
        $('.dropdownBox').removeClass('active');	//��click���Զ������������˵�����
    }
}