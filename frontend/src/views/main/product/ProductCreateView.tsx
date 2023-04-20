import { MainView } from '../MainView'
import { ProductCreateVM } from './ProductCreateVM'

import { ErrorMessageAlert } from '@/components/alert/error/ErrorMessageAlert'
import { SuccessMessageAlert } from '@/components/alert/success/SuccessMessageAlert'
import { FilledButton } from '@/components/button/FilledButton'
import { BasicCard } from '@/components/card/BasicCard'
import { NumberForm } from '@/components/form/NumberForm'
import { TextAreaForm } from '@/components/form/TextAreaForm'
import { TextForm } from '@/components/form/TextForm'

export const ProductCreateView = () => {
  const VM = ProductCreateVM()

  return (
    <MainView>
      <ErrorMessageAlert
        show={VM.showErrorAlert}
        message={VM.errorMessageForAlert}
        onClose={VM.handleCloseErrorAlert}
      />

      <SuccessMessageAlert
        show={VM.showSuccessAlert}
        message={VM.successMessageForAlert}
        onClose={VM.handleCloseSuccessAlert}
      />

      <div className="w-1/2 mx-auto">
        <BasicCard headerText="New Product">
          <p className="text-sm text-red-600 mb-3">{VM.newProductErrorMessage}</p>

          <div className="mb-3">
            <TextForm
              id="product_name"
              label="Product Name"
              val={VM.newProductName}
              handleChange={VM.handleChangeNewProductName}
            />
          </div>
          <div className="mb-3">
            <TextForm
              id="image"
              label="Image URL"
              val={VM.newProductImageURL}
              placeholder="https://xxxx.png"
              handleChange={VM.handleChangeNewProductImageURL}
            />
          </div>
          <div className="mb-3">
            <TextAreaForm
              id="description"
              label="Description"
              val={VM.newProductDescription}
              handleChange={VM.handleChangeNewProductDescription}
            />
          </div>
          <div className="mb-3">
            <NumberForm
              id="price"
              label="Price(ETH)"
              val={VM.newProductPrice}
              handleChange={VM.handleChangeNewProductPrice}
            />
          </div>

          <div className="flex justify-center">
            <FilledButton label="Create" onClick={VM.handleCreateNewProduct} />
          </div>
        </BasicCard>
      </div>
    </MainView>
  )
}
