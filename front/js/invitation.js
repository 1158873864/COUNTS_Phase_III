function getInvitationCode(){
	var invitationCode="EC819OQR4QD20K2";
    copy(invitationCode);

    alert("你的邀请码为:"+invitationCode+"\n邀请好友注册将获得额外奖励！\n*邀请码已自动复制");
}

function copy(text) {
    var oInput = document.createElement('input');
    oInput.value = text;
    document.body.appendChild(oInput);
    oInput.select(); 			  // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display='none';
}
