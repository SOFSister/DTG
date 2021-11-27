package DTGservlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import products.Product;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.*;
import java.util.Date;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/ProductsServlet")
public class ProductsServlet extends HttpServlet{
    private static final long serialVersionUID = 1L;
    public ProductsServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        doPost(request, response);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        String action=request.getParameter("action");
        if(action.equals("addCart")){
            addCart(request,response);
        }
        else if(action.equals("getProducts")){
            getProducts(request,response);
        }
    }
    protected void addCart(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            HttpSession session = request.getSession();
            request.setCharacterEncoding("UTF-8");
            ArrayList<Product> products= (ArrayList<Product>) session.getAttribute("products");
            String name=request.getParameter("name");
            int id= Integer.parseInt(request.getParameter("id"));
            String need=request.getParameter("need");
            //System.out.print(need);
            Product pd=new Product(id,name,need);
            if(products==null){
                products=new ArrayList<Product>();
            }
            products.add(pd);
            session.setAttribute("products",products);
            /*for (Product val:products) {
                System.out.print(val.getName());
            }*/
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    protected void getProducts(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            HttpSession session = request.getSession();
            request.setCharacterEncoding("UTF-8");
            ArrayList<Product> products= (ArrayList<Product>) session.getAttribute("products");
            String name=request.getParameter("name");
            int id= Integer.parseInt(request.getParameter("id"));
            String need=request.getParameter("need");
            //System.out.print(need);
            Product pd=new Product(id,name,need);
            if(products==null){
                products=new ArrayList<Product>();
            }
            products.add(pd);
            session.setAttribute("products",products);
            /*for (Product val:products) {
                System.out.print(val.getName());
            }*/
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
