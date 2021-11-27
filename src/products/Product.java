package products;

public class Product {
    private int id;
    private String name;
    private String need;
    public Product(int id,String name,String need){
        this.id=id;
        this.name=name;
        this.need=need;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNeed() {
        return need;
    }

    public void setNeed(String need) {
        this.need = need;
    }


}
