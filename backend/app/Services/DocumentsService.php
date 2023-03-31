<?php

namespace App\Services;

use App\Http\Requests\StoreDocumentsRequest;
use App\Repositories\DocumentsRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class DocumentsService
{
    protected $repository;

    public function __construct(DocumentsRepository $repository) {
        $this->repository = $repository;
    }

    public function index(): JsonResponse
    {
        return $this->repository->index();
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), (new StoreDocumentsRequest)->rules());

        if ($validator->fails()) {
            return response()->json([
                'dados' => null,
                'errors' => $validator->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return $this->repository->store($request);
    }

    public function show($id): JsonResponse
    {
        return $this->repository->show($id, true);
    }

    public function destroy($id): JsonResponse
    {
        return $this->repository->destroy($id);
    }
}
