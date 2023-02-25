<template>
    <Head>
        <title>Transactions - Aplikasi Kasir</title>
    </Head>
    <main class="c-main">
        <div class="container-fluid">
            <div class="fade-in">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card border-0 rounded-3 shadow">
                            <div class="card-body">

                                <div class="input-group mb-3">
                                    <span class="input-group-text"><i class="fa fa-barcode"></i></span>
                                    <input type="text" class="form-control" v-model="barcode" @keyup="searchProduct" placeholder="Scan or Input Barcode">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Product Name</label>
                                    <input type="text" class="form-control" :value="product.title" placeholder="Product Name" readonly>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Qty</label>
                                    <input type="number" v-model="qty" class="form-control text-center" placeholder="Qty" min="1">
                                </div>
                                <div class="text-end">
                                    <button @click.prevent="clearSearch" class="btn btn-warning btn-md border-0 shadow text-uppercase mt-3 me-2" :disabled="!product.id">CLEAR</button>
                                    <button class="btn btn-success btn-md border-0 shadow text-uppercase mt-3">ADD ITEM</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">

                        <div class="card border-0 rounded-3 shadow border-top-success">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4 col-4">
                                        <h4 class="fw-bold">GRAND TOTAL</h4>
                                    </div>
                                    <div class="col-md-8 col-8 text-end">
                                        <h4 class="fw-bold">Rp. {{ formatPrice(grandTotal) }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card border-0 rounded-3 shadow">
                            <div class="card-body">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="fw-bold">Cashier</label>
                                        <input class="form-control" type="text" :value="auth.user.name" readonly>
                                    </div>
                                    <div class="col-md-6 float-end">
                                        <label class="fw-bold">Customer</label>
                                        <VueMultiselect v-model="customer_id" label="name" track-by="name" :options="customers"></VueMultiselect>
                                    </div>
                                </div>
                                <hr>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr style="background-color: #e6e6e7;">
                                            <th scope="col">#</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Sub Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                                <hr>
                                <div class="d-flex align-items-end flex-column bd-highlight mb-3">
                                    <div class="mt-auto bd-highlight">
                                        <label>Discount (Rp.)</label>
                                        <input type="number" class="form-control" placeholder="Discount (Rp.)">
                                    </div>
                                    <div class="bd-highlight mt-4">
                                        <label>Pay (Rp.)</label>
                                        <input type="number" class="form-control" placeholder="Pay (Rp.)">
                                    </div>
                                </div>
                                <div class="text-end mt-4">
                                    <button class="btn btn-warning btn-md border-0 shadow text-uppercase me-2">Cancel</button>
                                    <button class="btn btn-purple btn-md border-0 shadow text-uppercase">Pay Order & Print</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

    //import layout
    import LayoutApp from '../../../Layouts/App.vue';

    //import Heade from Inertia
    import { Head } from '@inertiajs/inertia-vue3';

    //import VueMultiselect
    import VueMultiselect from 'vue-multiselect';
    import 'vue-multiselect/dist/vue-multiselect.css';

    //import ref form vue
    import { ref } from 'vue';

    //import axios
    import axios from 'axios';

    export default {
        //layout
        layout: LayoutApp,

        //register components
        components: {
            Head,
            VueMultiselect
        },

        //props
        props: {
            auth: Object,
            customers: Array,
            carts_total: Number
        },

        //composition API
        setup(props) {

            //define state
            const barcode = ref('');
            const product = ref({});
            const qty = ref(1);

            //metho "searchProduct"
            const searchProduct = () => {

                //fetch with axios
                axios.post('/apps/transactions/searchProduct', {

                    //send data "barcode"
                    barcode: barcode.value

                }).then(response => {
                    if(response.data.success) {

                        //assign response to state "product"
                        product.value = response.data.data;
                    } else {

                        //set state "product" to empty object
                        product.value = {};
                    }
                });
            }

            //method "clearSearch"
            const clearSearch = () => {

                //set state "product" to empty object
                product.value = {};

                //set state "barcode" to empty string
                barcode.value = '';
            }

            // define state grandTotal
            const grandTotal = ref(props.carts_total);

            return {
                barcode,
                product,
                searchProduct,
                clearSearch,
                qty,
                grandTotal
            }

        }
    }
</script>

<style>

</style>
