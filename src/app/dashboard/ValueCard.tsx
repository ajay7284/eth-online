interface Product {
    id: number
    name: string
    price: number
  }
  
  const products: Product[] = [
    { id: 1, name: "Wireless Earbuds", price: 79.99 },
    { id: 2, name: "Smart Watch", price: 199.99 },
    { id: 3, name: "Bluetooth Speaker", price: 59.99 },
    { id: 4, name: "Laptop Stand", price: 29.99 },
    { id: 5, name: "Wireless Mouse", price: 39.99 },
    { id: 6, name: "Power Bank", price: 49.99 },
    { id: 7, name: "USB-C Hub", price: 69.99 },
  ]
  
  export default function Value() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg w-[150px] shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
            >
              <h3 className="font-semibold text-sm mb-2 flex-grow">{product.name}</h3>
              <p className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }