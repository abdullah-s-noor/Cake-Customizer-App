const inputs = (formik) => [
    {
        name: "shape",
        id: "shape",
        type: "text",
        title: "Shape Name",
        value: formik.values.shape,
    },
    {
        name: "price",
        id: "price",
        type: "text",
        title: "Price",
        value: formik.values.price,
    },
    {
        name: "weight",
        id: "weight",
        type: "text",
        title: "Weight",
        value: formik.values.weight,
    },
    {
        name: "capacity",
        id: "capacity",
        type: "text",
        title: "Capacity",
        value: formik.values.capacity,
    },
    {
        name: "dimensions",
        id: "dimensions",
        type: "text",
        title: "Dimensions",
        value: formik.values.dimensions,
    },
    {
        name: "d",
        id: "d",
        type: "text",
        title: "SVG Path (d)",
        value: formik.values.d,
    },
    {
        name: "viewBox",
        id: "viewBox",
        type: "text",
        title: "SVG ViewBox",
        value: formik.values.viewBox,
    },
    {
        name: "image",
        id: "image",
        type: "file",
        title: "Image File",
        value: formik.values.image,
    },
];

export default inputs;
