"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import HostelBlockCard from '@/components/HostelBlockCard';
import { Filter, X, CheckCircle } from 'lucide-react';

function SearchContent() {
    const searchParams = useSearchParams();
    const locationQuery = searchParams.get('location')?.toLowerCase() || '';

    const [hostelBlocks, setHostelBlocks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        async function fetchHostelBlocks() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (locationQuery) params.append('location', locationQuery);
                if (selectedTypes.length > 0) params.append('types', selectedTypes.join(','));
                if (selectedFacilities.length > 0) params.append('facilities', selectedFacilities.join(','));

                const res = await fetch(`/api/hostel-blocks?${params.toString()}`);
                if (!res.ok) {
                    console.error('Failed to fetch hostel blocks');
                    setHostelBlocks([]);
                    return;
                }
                const data = await res.json();
                setHostelBlocks(data);
            } catch (error) {
                console.error('Error fetching hostel blocks:', error);
                setHostelBlocks([]);
            } finally {
                setLoading(false);
            }
        }
        fetchHostelBlocks();
    }, [locationQuery, selectedTypes, selectedFacilities]);

    const handleTypeChange = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleFacilityChange = (facility: string) => {
        setSelectedFacilities(prev =>
            prev.includes(facility)
                ? prev.filter(f => f !== facility)
                : [...prev, facility]
        );
    };

    return (
        <div className="min-h-screen bg-light pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-2">
                            Hostel Blocks
                        </h1>
                        <p className="text-dark-light font-medium">
                            {loading ? 'Searching...' : `${hostelBlocks.length} blocks available`}
                        </p>
                    </div>
                    <button
                        className="md:hidden flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm font-semibold text-dark border border-border"
                        onClick={() => setShowMobileFilters(true)}
                    >
                        <Filter size={18} /> Filters
                    </button>
                </header>

                <div className="flex gap-8 items-start">
                    {/* Sidebar Filters */}
                    <aside className={`
                        fixed inset-0 z-50 bg-card p-6 md:p-0 md:bg-transparent md:static md:w-64 md:block
                        ${showMobileFilters ? 'block' : 'hidden'}
                    `}>
                        <div className="md:hidden flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button onClick={() => setShowMobileFilters(false)}><X /></button>
                        </div>

                        <div className="bg-card md:p-6 md:rounded-2xl md:shadow-card space-y-8 sticky top-24 max-h-[80vh] overflow-y-auto border border-border">
                            {/* Hostel Type */}
                            <div>
                                <h3 className="text-sm font-bold text-dark uppercase tracking-wider mb-4">Hostel Type</h3>
                                <div className="space-y-3">
                                    {['Boys', 'Girls', 'Co-ed'].map(type => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                                {selectedTypes.includes(type) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedTypes.includes(type)}
                                                onChange={() => handleTypeChange(type)}
                                            />
                                            <span className="text-dark-light font-medium">{type} Hostel</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-border pt-6"></div>

                            {/* Facilities */}
                            <div>
                                <h3 className="text-sm font-bold text-dark uppercase tracking-wider mb-4">Facilities</h3>
                                <div className="space-y-3">
                                    {['WiFi', 'Gym', 'Library', 'Mess', 'Laundry', 'Sports'].map(facility => (
                                        <label key={facility} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedFacilities.includes(facility) ? 'bg-secondary border-secondary' : 'border-gray-300 group-hover:border-secondary'}`}>
                                                {selectedFacilities.includes(facility) && <CheckCircle size={14} className="text-white" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedFacilities.includes(facility)}
                                                onChange={() => handleFacilityChange(facility)}
                                            />
                                            <span className="text-dark-light font-medium">{facility}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {(selectedTypes.length > 0 || selectedFacilities.length > 0) && (
                                <button
                                    onClick={() => {
                                        setSelectedTypes([]);
                                        setSelectedFacilities([]);
                                    }}
                                    className="w-full py-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-white h-96 rounded-2xl"></div>
                                ))}
                            </div>
                        ) : hostelBlocks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {hostelBlocks.map((block) => (
                                    <HostelBlockCard key={block._id} block={block} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-card rounded-2xl p-12 text-center shadow-sm border border-border">
                                <div className="text-6xl mb-4">🏢</div>
                                <h3 className="text-xl font-bold text-dark mb-2">No hostel blocks found</h3>
                                <p className="text-dark-light">Try adjusting your filters</p>
                                <button
                                    onClick={() => {
                                        setSelectedTypes([]);
                                        setSelectedFacilities([]);
                                    }}
                                    className="mt-4 text-primary font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
