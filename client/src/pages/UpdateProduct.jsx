import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../redux/store/store-action";
import { useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import { Redirect } from "react-router-dom";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

const UpdateProduct = () => {
  //params
  const { productId } = useParams();

  //redux
  const { status, message } = useSelector((state) => state.message);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const selectedProduct = user.store.products.find(
    (product) => product.id === productId
  );

  //Set state
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pond, setPond] = useState();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    pathName: {
      data: "",
      type: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (
      product.name.length === 0 ||
      product.price.length === 0 ||
      product.stock.length === 0 ||
      product.price < 0 ||
      product.stock < 0 ||
      product.pathName.data.length === 0
    )
      return;
    setIsSubmitted(true);
    dispatch(updateProductAction(productId, product, user.token));
  };
  useEffect(() => {
    setProduct(() => {
      return {
        name: selectedProduct.name,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        pathName: {
          data: "",
          type: "",
        },
      };
    });
  }, [selectedProduct]);
  useEffect(() => {
    if (!!pond && !!selectedProduct.path && !imageLoaded) {
      pond.addFile(selectedProduct.path);
      setImageLoaded(true);
    }
  }, [pond, selectedProduct.path, imageLoaded]);
  return (
    <>
      <Nav searchBar={false} />
      {status === 200 && isSubmitted && <Redirect to="/yourStore" />}
      <Container
        className="d-flex flex-column justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        {status !== 200 && status !== null && isSubmitted && (
          <Alert variant="danger" className="mt-5">
            {message}
          </Alert>
        )}
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicProductName">
            <Form.Label>
              <h6>Product Name</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your product name"
              onChange={(e) =>
                setProduct((prev) => {
                  const name = e.target.value;
                  return { ...prev, name };
                })
              }
              value={product.name}
              isInvalid={validated && product.name.length === 0}
            />
            <Form.Control.Feedback type="invalid">
              Product name field is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProductPrice">
            <Form.Label>
              <h6>Product Price</h6>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your product price"
              onChange={(e) =>
                setProduct((prev) => {
                  const price = e.target.value;
                  return { ...prev, price };
                })
              }
              value={product.price}
              min="0"
              isInvalid={
                validated && (product.price.length === 0 || product.price < 0)
              }
            />
            <Form.Control.Feedback type="invalid">
              Invalid product price
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProductName">
            <Form.Label>
              <h6>Product Stock</h6>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your product name"
              min="0"
              onChange={(e) =>
                setProduct((prev) => {
                  const stock = e.target.value;
                  return { ...prev, stock };
                })
              }
              isInvalid={
                validated && (product.stock.length === 0 || product.stock < 0)
              }
              value={product.stock}
            />
            <Form.Control.Feedback type="invalid">
              Invalid product stock
            </Form.Control.Feedback>
          </Form.Group>
          <h6>Product Image</h6>
          <Form.Group className="mb-3" controlId="formBasicProductName">
            <FilePond
              name="pathName"
              allowFileSizeValidation
              allowImageResize
              maxFileSize={2000000}
              imageResizeTargetWidth={300}
              imageResizeTargetHeight={150}
              imagePreviewMinHeight={150}
              imagePreviewWidth={300}
              ref={(ref) => setPond(ref)}
              onremovefile={() =>
                setProduct((prev) => {
                  return { ...prev, pathName: { data: "", type: "" } };
                })
              }
              onaddfile={(e, file) => {
                setProduct((prev) => {
                  const data = file.getFileEncodeBase64String();
                  let str = file.fileType;
                  let newStr = "";
                  if (str.includes(";")) {
                    const index = str.indexOf(";");
                    newStr = str.slice(0, index);
                  } else newStr = str;
                  const type = newStr;

                  return {
                    ...prev,
                    pathName: { data, type },
                  };
                });
              }}
            />
            <Form.Control
              type="hidden"
              isInvalid={validated && product.pathName.data.length === 0}
            />
            <Form.Control.Feedback type="invalid">
              Product image is required
            </Form.Control.Feedback>
          </Form.Group>
          {message === "Loading" && (
            <>
              <Spinner
                className="d-flex mx-auto"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </>
          )}
          {console.log(product)}
          <div className="d-grid gap-2 d-md-flex justify-content-md-center my-5">
            <Button variant="dark" type="submit">
              Update Product
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};
export default UpdateProduct;
