package com.example.inextricable_cipher_xjh;

import java.util.ArrayList;

public class test2 {

	   public static void main(String []args){
		   String hahah="1";
		   ArrayList list=new ArrayList<>();
		   for(int i=0;i<hahah.length();i++){
			   int tem0=AsciiAndInt.AscToInt(hahah.charAt(i));
			   System.out.println(tem0);
			   list.add(encryption.encrypt(tem0));
		   }
		   System.out.println(list);
		   /*
		   String result="";
		   for(int i=0;i<list.size();i++){
			   char tem0=AsciiAndInt.IntToAsc(Decrypt.decrypt((int)list.get(i)));
			   result=result+tem0;
		   }
		   System.out.println("result"+result);*/
		   
		   
		   
		   
		   
		   
	    	/*int tem=encryption.encrypt(98);
	    	System.out.println("tem"+tem);
	    	int result=Decrypt.decrypt(tem);
	    	System.out.println("result"+result);*/
	    }

}
