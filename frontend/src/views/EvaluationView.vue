<template>
  <v-app>
    <v-container class="py-12">
      <v-card color="grey-darken-3" class="pa-6 rounded-lg elevation-6">
        <v-card-title class="text-h4 font-weight-bold text-black-lighten-2 mb-4">ประเมินระบบ</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitEvaluation" ref="evaluationForm">
            <!-- ข้อ 1: ความพึงพอใจในด้านการใช้งานระบบ -->
            <v-select
              v-model="questions.q1"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="1. คุณพึงพอใจในด้านการใช้งานระบบมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 2: ความง่ายในการใช้งาน -->
            <v-select
              v-model="questions.q2"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="2. ระบบนี้ใช้งานง่ายมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 3: ความเร็วของระบบ -->
            <v-select
              v-model="questions.q3"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="3. ระบบนี้ทำงานเร็วมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 4: ความน่าเชื่อถือ -->
            <v-select
              v-model="questions.q4"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="4. ระบบนี้มีความน่าเชื่อถือมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 5: อินเตอร์เฟซผู้ใช้ -->
            <v-select
              v-model="questions.q5"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="5. อินเตอร์เฟซผู้ใช้ของระบบน่าสนใจมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 6: ความช่วยเหลือจากระบบ -->
            <v-select
              v-model="questions.q6"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="6. ระบบให้ความช่วยเหลือในการใช้งานมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 7: ความปลอดภัย -->
            <v-select
              v-model="questions.q7"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="7. ระบบนี้มีความปลอดภัยมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 8: ความสะดวกในการเข้าถึง -->
            <v-select
              v-model="questions.q8"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="8. ระบบนี้สะดวกในการเข้าถึงมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 9: ความสอดคล้องกับความต้องการ -->
            <v-select
              v-model="questions.q9"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="9. ระบบนี้สอดคล้องกับความต้องการของคุณมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 10: ความมั่นใจในการใช้งาน -->
            <v-select
              v-model="questions.q10"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="10. คุณมั่นใจในการใช้งานระบบนี้มากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 11: ความทันสมัยของระบบ -->
            <v-select
              v-model="questions.q11"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="11. ระบบนี้ทันสมัยมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 12: ความชัดเจนของข้อมูล -->
            <v-select
              v-model="questions.q12"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="12. ข้อมูลในระบบชัดเจนมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 13: ความต่อเนื่องของบริการ -->
            <v-select
              v-model="questions.q13"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="13. บริการของระบบต่อเนื่องมากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 14: ความพึงพอใจโดยรวม -->
            <v-select
              v-model="questions.q14"
              :items="['มาก', 'ปานกลาง', 'น้อย', 'ไม่มีเลย']"
              label="14. คุณพึงพอใจโดยรวมกับระบบนี้มากน้อยเพียงใด?"
              required
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-select>

            <!-- ข้อ 15: คำแนะนำเพิ่มเติม -->
            <v-text-field
              v-model="questions.q15"
              label="15. คำแนะนำหรือข้อเสนอแนะเพิ่มเติมเกี่ยวกับระบบ"
              color="blue-lighten-2"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-btn
              color="blue-lighten-2"
              dark
              block
              type="submit"
              :loading="loading"
              class="mt-4"
            >
              ส่งการประเมิน
            </v-btn>

            <v-alert v-if="success" type="success" class="mt-4">ส่งการประเมินสำเร็จ!</v-alert>
            <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
// นำเข้า useRouter จาก vue-router
import { useRouter } from 'vue-router';

export default {
  name: 'EvaluationView',
  data() {
    return {
      questions: {
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
        q6: null,
        q7: null,
        q8: null,
        q9: null,
        q10: null,
        q11: null,
        q12: null,
        q13: null,
        q14: null,
        q15: null, // ข้อ 15 เป็นข้อความฟรี
      },
      loading: false,
      success: false,
      error: null,
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    submitEvaluation() {
      this.loading = true;
      this.success = false;
      this.error = null;

      // ซimulการส่งข้อมูล (ไม่เก็บในฐานข้อมูล)
      setTimeout(() => {
        this.success = true;
        this.questions = {
          q1: null,
          q2: null,
          q3: null,
          q4: null,
          q5: null,
          q6: null,
          q7: null,
          q8: null,
          q9: null,
          q10: null,
          q11: null,
          q12: null,
          q13: null,
          q14: null,
          q15: null,
        }; // รีเซ็ตฟอร์ม
        this.router.push('/'); // นำไปยังหน้า Home หลังส่งสำเร็จ
        this.loading = false;
      }, 1000); // ซimulการโหลด 1 วินาที
    },
  },
};
</script>

<style scoped>
/* สไตล์เพิ่มเติมถ้าต้องการ */
</style>