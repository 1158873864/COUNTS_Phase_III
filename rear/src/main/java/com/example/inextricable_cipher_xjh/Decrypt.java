package com.example.inextricable_cipher_xjh;

import com.example.Resolve_equation.Resolve_XEuler_mod_M;

public class Decrypt {
   static  int p=12553;
    static  int q=13007;
    static  int m=163276871;
    static  int k=79921;
   public static int decrypt(int a){
       int result= Resolve_XEuler_mod_M.decode(k,a,m,(p-1)*(q-1));
       return result;
   }


}
