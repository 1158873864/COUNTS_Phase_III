package com.example.inextricable_cipher_xjh;

import com.example.Resolve_equation.AEuler_mod_M;

public class encryption {
    static int m=163276871;
    static int k=79921;
    public static int encrypt(int t){
     int  result= AEuler_mod_M.getyu(t,k,m);
     return result;
    }
}
