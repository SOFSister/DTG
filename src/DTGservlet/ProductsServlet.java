package DTGservlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import db.DBConnection;
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
        else if(action.equals("getProductsName")){
            getProductsName(request,response);
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
                System.out.println(val.getName());
            }*/
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    protected void getProducts(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            //System.out.println("我进来了");
            HttpSession session = request.getSession();
            response.setContentType("application/json;charset=UTF-8");
            request.setCharacterEncoding("UTF-8");
            ArrayList<Product> products= (ArrayList<Product>) session.getAttribute("products");
            if(products==null){
                JsonObject jsonContainer =new JsonObject();
                jsonContainer.addProperty("empty",true);
                PrintWriter writer = response.getWriter();
                writer.write(new Gson().toJson(jsonContainer));
                writer.flush();
            }
            else{
                Map<String, Integer> map=new HashMap<String, Integer>();
                for (Product val:products) {
                    String pd=String.valueOf(val.getId())+"!"+val.getNeed();
                    if(map.containsKey(pd)){
                        int cnt=map.get(pd);
                        map.put(pd,cnt+1);
                    }
                    else{
                        map.put(pd,1);
                    }
                }
                //System.out.println(map.size());
                Gson gson = new GsonBuilder().create();
                String jsonStr=gson.toJson(map);
                //System.out.print(jsonStr);
                PrintWriter writer = response.getWriter();
                writer.write(jsonStr);
                writer.flush();
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    protected void getProductsName(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            HttpSession session = request.getSession();
            response.setContentType("application/json;charset=UTF-8");
            request.setCharacterEncoding("UTF-8");
            int id= Integer.parseInt(request.getParameter("id"));
            DBConnection dbConnection=new DBConnection();
            String sql="select ProductName from productinfo where ProductID="+id;
            ArrayList<Map<String,String>> rs=dbConnection.queryForList(sql);
            dbConnection.close();
            JsonObject jsonContainer =new JsonObject();
            jsonContainer.addProperty("productName",rs.get(0).get("ProductName"));
            PrintWriter writer = response.getWriter();
            writer.write(new Gson().toJson(jsonContainer));
            writer.flush();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
