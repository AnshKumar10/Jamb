export default function FooterSkeleton() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <div className="space-y-2">
            <div className="h-4 w-40 animate-pulse bg-background" />
            <div className="h-4 w-32 animate-pulse bg-background" />
            <div className="h-4 w-36 animate-pulse bg-background" />
          </div>

          <div>
            <div className="h-4 w-48 animate-pulse bg-background" />
          </div>

          <div className="lg:col-span-1">
            <div className="mb-4 h-4 w-24 animate-pulse bg-background" />
            <div className="flex gap-2">
              <div className="h-10 flex-1 animate-pulse bg-background" />
              <div className="h-10 w-24 animate-pulse bg-background" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse bg-background" />
              <div className="h-3 w-40 animate-pulse bg-background" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="mb-4 border-t pt-4">
              <div className="h-5 w-32 animate-pulse bg-background" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse bg-background" />
              <div className="h-4 w-20 animate-pulse bg-background" />
              <div className="h-4 w-28 animate-pulse bg-background" />
              <div className="h-4 w-32 animate-pulse bg-background" />
            </div>
            <div className="mt-8 mb-4 border-t pt-4">
              <div className="h-5 w-36 animate-pulse bg-background" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-28 animate-pulse bg-background" />
              <div className="h-4 w-24 animate-pulse bg-background" />
              <div className="h-4 w-20 animate-pulse bg-background" />
            </div>
            <div className="mt-8 border-t pt-4">
              <div className="h-5 w-40 animate-pulse bg-background" />
            </div>
          </div>

          <div>
            <div className="mb-4 border-t pt-4">
              <div className="h-5 w-36 animate-pulse bg-background" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-28 animate-pulse bg-background" />
              <div className="h-4 w-32 animate-pulse bg-background" />
              <div className="h-4 w-24 animate-pulse bg-background" />
              <div className="h-4 w-20 animate-pulse bg-background" />
              <div className="h-4 w-26 animate-pulse bg-background" />
              <div className="h-4 w-30 animate-pulse bg-background" />
            </div>
          </div>

          <div>
            <div className="mb-4 border-t pt-4">
              <div className="h-5 w-40 animate-pulse bg-background" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 animate-pulse bg-background" />
              <div className="h-4 w-24 animate-pulse bg-background" />
              <div className="h-4 w-22 animate-pulse bg-background" />
              <div className="h-4 w-36 animate-pulse bg-background" />
            </div>
            <div className="mt-8 mb-4 border-t pt-4">
              <div className="h-5 w-32 animate-pulse bg-background" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 animate-pulse bg-background" />
              <div className="h-4 w-24 animate-pulse bg-background" />
              <div className="h-4 w-18 animate-pulse bg-background" />
              <div className="h-4 w-36 animate-pulse bg-background" />
              <div className="h-4 w-22 animate-pulse bg-background" />
              <div className="h-4 w-24 animate-pulse bg-background" />
              <div className="h-4 w-32 animate-pulse bg-background" />
              <div className="h-4 w-20 animate-pulse bg-background" />
              <div className="h-4 w-28 animate-pulse bg-background" />
              <div className="h-4 w-24 animate-pulse bg-background" />
            </div>
          </div>

          <div>
            <div className="mb-4 border-t pt-4">
              <div className="h-5 w-24 animate-pulse bg-background" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-28 animate-pulse bg-background" />
              <div className="h-4 w-26 animate-pulse bg-background" />
              <div className="h-4 w-24 animate-pulse bg-background" />
              <div className="h-4 w-20 animate-pulse bg-background" />
              <div className="h-4 w-28 animate-pulse bg-background" />
            </div>
          </div>

          <div>
            <div className="mb-4 border-t pt-4">
              <div className="h-5 w-20 animate-pulse bg-background" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse bg-background" />
              <div className="h-4 w-18 animate-pulse bg-background" />
              <div className="h-4 w-22 animate-pulse bg-background" />
              <div className="h-4 w-24 animate-pulse bg-background" />
              <div className="h-3 w-26 animate-pulse bg-background" />
              <div className="h-4 w-28 animate-pulse bg-background" />
              <div className="h-4 w-32 animate-pulse bg-background" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
