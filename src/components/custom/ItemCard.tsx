import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
    // Format the date for display
    const formattedDate = new Date(item.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Card className="max-h-[500px] max-w-[350px] group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border-gray-800 shadow-md">
            <div className="relative overflow-hidden bg-black aspect-square">
                {item.images.length > 1 ? (
                  <Carousel className="w-full h-full">
                    <CarouselContent>
                      {item.images.map((image, index) => (
                        <CarouselItem key={index} className="h-full">
                          <div className="relative h-full">
                            <img
                              src={image} // Assuming images are URLs or base64
                              alt={`${item.title} - ${index + 1}`}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" />
                  </Carousel>
                ) : (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                )}
            </div>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">{item.title}</CardTitle>
                <CardDescription className="text-gray-400">
                    Posted by: {item.userId.firstname} {item.userId.lastname} - {formattedDate}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-32">
                  <p className="text-sm text-gray-300 whitespace-pre-line">{item.description}</p>
                </ScrollArea>
                <div className="mt-4">
                    <Badge variant="secondary" className="mr-2 bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {item.category}
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                        {item.condition}
                    </Badge>
                </div>
                <p className="text-xl font-bold text-green-400 mt-4">Price: ${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-400">Location: {item.location}</p>
                <Badge
                  variant={item.status === 'Available' ? 'default' : 'destructive'}
                  className={cn(
                    "mt-2",
                    item.status === 'Available'
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : "bg-red-500/20 text-red-300 border-red-500/30"
                  )}
                >
                  Status: {item.status}
                </Badge>

            </CardContent>
            <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ItemCard;
