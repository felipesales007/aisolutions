<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\DocumentsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentsController extends Controller
{
    protected $service;

    public function __construct(DocumentsService $service) {
        $this->service = $service;
    }

    public function index(): JsonResponse
    {
        return $this->service->index();
    }

    public function store(Request $request): JsonResponse
    {
        return $this->service->store($request);
    }

    public function show($id): JsonResponse
    {
        return $this->service->show($id);
    }

    public function destroy($id): JsonResponse
    {
        return $this->service->destroy($id);
    }
}
