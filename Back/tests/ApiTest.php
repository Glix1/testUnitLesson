<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiTest extends WebTestCase
{

    public function testApiRoot(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello"], $responseData);
    }

    public function testApiAddition(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function testApiProductsGet(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        //echo $responseData;
        //$this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function testApiProductsPost(): void
    {
        $client = static::createClient();
        $data = ['name' => 'Rick Sanchez',
                        'price' => 30,
                        'quantity' => 30,
                        'image' => "https://rickandmortyapi.com/api/character/avatar/1.jpeg"];
        $client->jsonRequest('POST', '/api/products', ['name' => 'Rick Sanchez',
        'price' => 30,
        'quantity' => 30,
        'image' => "https://rickandmortyapi.com/api/character/avatar/1.jpeg"]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        echo $response;
        $this->assertContains(21, $responseData);
    }
    
    public function testApiProductsGetParam(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products/15');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        echo $response;
        //$this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function testApiProductsDeleteOne(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('DELETE', '/api/products/15');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        echo $response;
        $this->assertEquals(['delete' => 'ok'], $responseData);
    }

    public function testApiCart(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/cart');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        echo $response;
        $this->assertEmpty($responseData);
    }

    // public function testApiAddCart(): void
    // {
    //     $client = static::createClient();
    //     // Request a specific page
    //     $data = ['name' => 'Rick Sanchez',
    //                     'price' => 30,
    //                     'quantity' => 30,
    //                     'image' => "https://rickandmortyapi.com/api/character/avatar/1.jpeg"];
    //     $client->jsonRequest('POST', '/api/cart', ['id' => 1, 'quantity => 10']);
    //     $response = $client->getResponse();
    //     $this->assertResponseIsSuccessful();
    //     $this->assertJson($response->getContent());
    //     $responseData = json_decode($response->getContent(), true);
    //     echo $response;
    //     //$this->assertEmpty($responseData);
    // }
}
