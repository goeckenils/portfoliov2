'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import Image from 'next/image';

const products = [
  {
    id: '1',
    name: 'NILS GOECKE STUDIO HOODIE',
    price: '€85.00',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'ARCHITECTURAL TYPE POSTER',
    price: '€45.00',
    category: 'Print',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'SWISS SYSTEM CAP [BLK]',
    price: '€35.00',
    category: 'Accessory',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'DEBUGGING REALITY TEE',
    price: '€45.00',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function ShopPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo('.shop-item-reveal', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
    .fromTo('.product-card', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power4.out', clearProps: 'all' },
      '-=0.5'
    );
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen pt-48 md:pt-64 lg:pt-80 px-4 md:px-6 lg:px-8 pb-32">
      <div className="md:ml-[var(--column)] md:pl-8">
        
        {/* Header */}
        <section className="mb-20 md:mb-32">
          <span className="shop-item-reveal text-xs font-bold tracking-[0.2em] uppercase opacity-30 mb-4 block">
            Studio Store / Editions
          </span>
          <h1 className="shop-item-reveal text-5xl md:text-8xl font-bold tracking-[-0.04em] leading-none mb-8">
            Shop
          </h1>
          <p className="shop-item-reveal text-lg md:text-2xl text-gray-400 max-w-2xl font-medium tracking-wide">
            High-quality garments and printed matter exploring the intersection of design and code. 
            All items are made-to-order.
          </p>
        </section>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-24">
          {products.map((product) => (
            <div key={product.id} className="product-card group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-6 bg-[#f5f5f5]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <button className="absolute bottom-6 left-6 right-6 py-4 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase rounded-lg shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Add to Cart
                </button>
              </div>
              
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold tracking-tight">{product.name}</h3>
                  <span className="text-sm font-bold opacity-40 tabular-nums">{product.price}</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">{product.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="shop-item-reveal mt-32 md:mt-48 p-8 md:p-12 bg-[#f5f5f5] rounded-2xl max-w-4xl">
          <h4 className="text-sm font-bold tracking-widest uppercase mb-6">Shopping Information</h4>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-30 mb-2">Sustainable</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Products are created individually only when ordered, reducing waste and environmental impact.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-30 mb-2">Shipping</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Worldwide shipping available. Each order is tracked and insured from production to delivery.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-30 mb-2">Support</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                For questions regarding sizing or bulk orders, please contact our support team.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
