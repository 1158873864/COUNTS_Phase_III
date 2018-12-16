function DropDown(box) {
				this.dd = box;
				this.placeholder = this.dd.children('span');
				this.opts = this.dd.find('ul.dropdown > li');
				this.val = '';
				this.index = -1;
				this.initEvents();
			}
			DropDown.prototype = {
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

						//删除原有选中标记
						$('#dropdownItems li a i').removeClass("fa fa-check");
						//标记为选中项
						$(this.firstChild.firstChild).addClass("fa fa-check");
						//alert($(this.children[0]));
                        if(obj.val=="All"){
                            $.ajax(
                                {
                                    url: "http://localhost:8080/getFinishedTasks",
                                    data: {
                                        id:getUsername()
                                    },
                                    async: false,
                                    success: function (data) {
                                        var directoryForAllTask=new Array();//总共max张
                                        var textForAllTask=new Array();
                                        for(var i=0;i<data.length;i++){
                                            textForAllTask.push(data[i]);
                                            $.ajax(
                                                {
                                                    url: "http://localhost:8080/getFirstPic",
                                                    data: {
                                                        taskName:data[i]
                                                    },
                                                    async: false,
                                                    success: function (d) {
                                                        directoryForAllTask.push(d);

                                                    },
                                                    error: function (xhr) {
                                                        directoryForAllTask.push(xhr.responseText);

                                                    },
                                                    traditional: true,
                                                }
                                            )
                                        }
                                        showFinishedTask(directoryForAllTask,textForAllTask);

                                    },
                                    error: function (xhr) {
                                        //alert('动态页有问题噶！\n\n' + xhr.responseText);
                                    },
                                    traditional: true,
                                }
                            )
                        }
                        else {

                            $.ajax(
                                {
                                    url: "http://localhost:8080/getFinishedTasksByType",
                                    data: {
                                        kind: obj.val,
                                        id: getUsername()
                                    },
                                    async: false,
                                    success: function (data) {
                                        var directoryForAllTask = new Array();//总共max张
                                        var textForAllTask = new Array();
                                        for (var i = 0; i < data.length; i++) {
                                            textForAllTask.push(data[i]);
                                            $.ajax(
                                                {
                                                    url: "http://localhost:8080/getFirstPic",
                                                    data: {
                                                        taskName: data[i]
                                                    },
                                                    async: false,
                                                    success: function (data) {
                                                        directoryForAllTask.push(data);
                                                    },
                                                    error: function (xhr) {
                                                        directoryForAllTask.push(xhr.responseText);
                                                    },
                                                    traditional: true,
                                                }
                                            )
                                        }
                                        showFinishedTask(directoryForAllTask, textForAllTask);

                                    },
                                    error: function (xhr) {
                                        //alert('动态页有问题噶！\n\n' + xhr.responseText);
                                    },
                                    traditional: true,
                                }
                            )
                        }
                        /*在这里写后台查找方法,obj.value就是要查询的分类名*/

					});
				},
				getValue : function() {
					return this.val;
				},
				getIndex : function() {
					return this.index;
				}
			}
			$(function() {
				var dd = new DropDown( $('#category') );
				$(document).click(function() {
					// all dropdowns
					$('.dropdownBox').removeClass('active');
				});
			});