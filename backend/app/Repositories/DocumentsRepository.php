<?php

namespace App\Repositories;

use App\Models\Documents;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DocumentsRepository
{
    public function index(): JsonResponse
    {
        try {
            $query = Documents::select('id', 'name', 'size')->orderBy('id')->get();

            return response()->json([
                'dados' => ["metadata" => $query],
                'erro' => null
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'dados' => null,
                'erro' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store($request): JsonResponse
    {
        DB::beginTransaction();

        try {
            if ($request->has('remove')) {
                foreach ($request->remove as $item) {
                    $this->destroy($item);
                }
            }

            if ($request->has('metadata')) {
                foreach ($request->metadata as $item) {
                    if (empty($item['id'])) {
                        Documents::create($item);
                    }
                }
            }

            DB::commit();

            return response()->json([
                'dados' => true,
                'erro' => null,
            ], Response::HTTP_CREATED);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'dados' => null,
                'erro' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $query = Documents::select('id', 'name', 'size', 'contentType', 'base64')->findOrFail($id);

            return response()->json([
                'dados' => $query,
                'erro' => null
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'dados' => null,
                'erro' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            Documents::findOrFail($id)->delete();

            return response()->json([
                'dados' => true,
                'erro' => null,
            ], Response::HTTP_NO_CONTENT);
        } catch (Exception $e) {
            return response()->json([
                'dados' => null,
                'erro' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
