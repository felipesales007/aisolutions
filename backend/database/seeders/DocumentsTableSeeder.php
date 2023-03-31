<?php

namespace Database\Seeders;

use App\Models\Documents;
use Illuminate\Database\Seeder;

class DocumentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Documents::updateOrCreate([
            'id' => 1,
        ], [
            'id' => 1,
            'name' => 'comandos.txt',
            'size' => '141',
            'contentType' => 'text/plain',
            'base64' => 'Z2l0IGluaXQNCmdpdCBhZGQgLS1hbGwNCmdpdCBjb21taXQgLW0gInN0YXJ0IHByb2plY3QiDQpnaXQgcmVtb3RlIGFkZCBvcmlnaW4gZ2l0QGdpdGh1Yi5jb206cmVwb3NpdG9yaW8vcHJvamV0by5naXQNCmdpdCBwdXNoIG9yaWdpbiBtYXN0ZXIK',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
