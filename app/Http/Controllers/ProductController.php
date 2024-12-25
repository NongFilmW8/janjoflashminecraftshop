<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    private $products = [
        ['id' => 1, 'Normal ID' => 'Normal ID',
         'description' => "✅ สามารถเปลี่ยนข้อมูลได้ทั้งหมด\n" .
                         "✅ ทางร้านขายยกเมล หมดกังวลเรื่องไอดีโดนดึงคืน\n" .
                         "✅ เป็นไอดีที่ Migrate เป็น Microsoft account แล้ว ซึ่งมีความปลอดภัยสูง\n" .
                         "✅ สามารถเปลี่ยนอีเมลได้ทันที (ขายยกเมล)\n" .
                         "✅ สามารถเข้าเล่นในเซิฟ HYPIXEL",
         'price' => 1500,
         'image' => 'https://media.discordapp.net/attachments/1321335591836717107/1321335987909165087/NormalID.png?ex=676cdd88&is=676b8c08&hm=8a62b59675461187a19f6f21d737a63d94679fbd1a10a69e0cb7112ee0aebe3f&=&format=webp&quality=lossless&width=936&height=936'],
        ['id' => 2, 'Cape' => 'ผ้าคลุม',
        'description' => 'Latest smartphone with great features',
        'price' => 800,
        'image' => 'https://media.discordapp.net/attachments/1321335591836717107/1321340307937169440/LF75IBoGiLVBcVaYMQdSyQVU2wmZQRjI_-_VanillaMigrator.png?ex=676ce18e&is=676b900e&hm=65bfc6d1045c91b086cd0fecc2e065077050c406963b8b6a2d727a25c882a7e4&=&format=webp&quality=lossless&width=936&height=936'],

        ['id' => 3, 'name' => 'Tablet',
        'description' => 'Portable tablet for everyday use',
        'price' => 500,
        'image' => 'images/tablet.jpg'],
        ['id' => 4, 'name' => 'Diamond Sword',
        'description' => 'A powerful sword made of diamond',

        'price' => 99.99,
        'image' => 'images/diamond_sword.jpg'],

        ['id' => 5, 'name' => 'Iron Pickaxe',
        'description' => 'Durable mining tool',
        'price' => 49.99,
        'image' => 'images/iron_pickaxe.jpg'],
        ['id' => 6, 'name' => 'Golden Apple',
        'description' => 'A magical apple that grants health',
        'price' => 10.00,
        'image' => 'images/golden_apple.jpg'],
        ['id' => 7, 'name' => 'Ender Pearl',
        'description' => 'A mysterious pearl that allows teleportation',
        'price' => 20.00,
        'image' => 'images/ender_pearl.jpg'],
        ['id' => 8, 'name' => 'Crafting Table',
        'description' => 'Essential for crafting items',
        'price' => 5.00,
        'image' => 'images/crafting_table.jpg'],
        ['id' => 9, 'name' => 'Bed',
        'description' => 'A place to sleep and set your spawn point',
        'price' => 15.00,
        'image' => 'images/bed.jpg'],
        ['id' => 10, 'name' => 'Bow',
        'description' => 'A ranged weapon for attacking enemies',
        'price' => 30.00,
        'image' => 'images/bow.jpg'],
        ['id' => 11, 'name' => 'Fishing Rod',
        'description' => 'Used for fishing in water',
        'price' => 10.00,
        'image' => 'images/fishing_rod.jpg'],
        ['id' => 12, 'name' => 'Potion of Healing',
        'description' => 'Restores health when consumed',
        'price' => 25.00,
        'image' => 'images/potion_of_healing.jpg'],
    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Products/Index', ['products' => $this->products]);
    }


    //ส้างหน้า create
    public function create()
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     *///เพิ่มรูปใน create
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = $request->file('image')->store('images', 'public');

        Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'image' => $imagePath,
        ]);

        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = collect($this->products)->firstWhere('id', $id);
        if (!$product) {
            abort(404, 'Product not found');
        }
        return Inertia::render('Products/Show', ['product' => $product]);
    }
    public function buy($id)
    {
        $product = Product::findOrFail($id);
        // เพิ่ม logic สำหรับการซื้อสินค้า เช่น การชำระเงิน หรือการบันทึกการซื้อ
        return redirect()->route('products.index')->with('success', 'You have successfully purchased ' . $product->name);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


}
