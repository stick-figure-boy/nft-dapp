import { ErrorMessageAlert } from '@/components/alert/error/ErrorMessageAlert'
import { CollectionVM, Product } from '@/views/main/collection/CollectionVM'
import { ProductCard } from '@/views/main/collection/components/ProductCard'
import { MainView } from '@/views/main/MainView'

export const CollectionView = () => {
  const VM = CollectionVM()

  return (
    <MainView>
      <ErrorMessageAlert
        show={VM.showErrorAlert}
        message={VM.errorMessageForAlert}
        onClose={VM.handleCloseErrorAlert}
      />

      <div className="relative mb-16">
        <img src={VM.user.header_image_url} className="h-64 w-full object-cover rounded-xl" />

        <img
          src={VM.user.avatar_image_url}
          className="h-40 w-40 absolute top-1/2 left-10 rounded-xl border-4 border-white shadow"
        />
      </div>

      <div className="mb-8">
        <p className="font-bold text-2xl">{VM.user.name}</p>
        <p>{VM.user.bio}</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">sort menu</div>
        <div className="col-span-3">
          <div className="grid grid-cols-4 gap-4">
            {VM.products.map((p: Product, i) => (
              <ProductCard key={`product-${i}`} product={p} />
            ))}
          </div>
        </div>
      </div>
    </MainView>
  )
}
