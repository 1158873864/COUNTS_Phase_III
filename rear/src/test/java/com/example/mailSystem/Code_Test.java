package com.example.mailSystem;
import com.example.inextricable_cipher_xjh.AsciiAndInt;
import com.example.inextricable_cipher_xjh.Decrypt;
import com.example.inextricable_cipher_xjh.encryption;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.*;
public class Code_Test {

    @Test
    public void test() {
        String hahah="Jack, this is Rose!666";
        ArrayList list=new ArrayList<>();
        for(int i=0;i<hahah.length();i++){
            int tem0= AsciiAndInt.AscToInt(hahah.charAt(i));
            list.add(encryption.encrypt(tem0));
        }

        String result="";
        for(int i=0;i<list.size();i++){
            char tem0=AsciiAndInt.IntToAsc(Decrypt.decrypt((int)list.get(i)));
            result=result+tem0;
        }

        assertEquals(result,"Jack, this is Rose!666");

    }
}
