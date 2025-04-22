import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Item } from "@/lib/interfaces";
import ItemCard from "@/components/custom/ItemCard";

const ItemSection: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 6; 

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                // Construct the URL with query parameters
                const url = `http://localhost:5000/v0/items/all?page=${page}&limit=${itemsPerPage}`; // Adjust the endpoint as needed
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch items: ${response.status}`);
                }

                const data = await response.json();

                if(data.data.items) { //check if data.items exists
                  setItems(data.data.items);
                  setTotalPages(data.totalPages);
                } else {
                  setError("No items found");
                  setItems([]);
                  setTotalPages(0);
                }


            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching items.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [page]); // Depend on page

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <h1>Top Picks</h1>
                {Array.from({ length: itemsPerPage }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <CardTitle className="h-6 bg-gray-700 rounded w-3/4"></CardTitle>
                      <CardDescription className="h-4 bg-gray-800 rounded w-1/2 mt-2"></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 bg-gray-800 rounded mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gray-700 text-gray-400"></Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
        {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4">
                <Button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                >
                    Previous
                </Button>
                <span className="text-gray-400">
                    Page {page} of {totalPages}
                </span>
                <Button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                >
                    Next
                </Button>
            </div>
        )}
        {items.length === 0 && !loading && (
            <div className="text-gray-400 text-center">No items found.</div>
        )}
      </div>
    );
};

export default ItemSection;
