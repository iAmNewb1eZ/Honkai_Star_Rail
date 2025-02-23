<template>
    <div class="q-glutter-md" style="max-width: 500px; margin: auto;">
        <q-form @submit="onSubmit"
        class="q-gutter-md"
        >
            <q-input v-model="first_name" label="First Name" />
            <q-input v-model="last_name" label="Last Name" />
            <q-input v-model="email" label="Email" />
            <q-input v-model="address" label="Address" />
            <q-input v-model="phone_number" label="Phone Number" />
            <q-btn type="submit" label="Submit" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router'

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const address = ref('')
const phone_number = ref('')

const onSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Device b9c3fb89-5d38-4477-9008-b2760c1c0ef5:men9cKiBEToKgG1wTHoWMgywP5X4KgE9");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "first_name": first_name.value,
        "last_name": last_name.value,
        "email": email.value,
        "address": address.value,
        "phone_number": phone_number.value
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:8800/api/v1/customers", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        alert(result.message);
        if (result.status === 'ok') {
            router.push('/')
        }
    })
    .catch((error) => console.error(error));

}

</script>