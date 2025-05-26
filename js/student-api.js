import API from "./api.js";

class StudentAPI {
  constructor() {
    // إنشاء نسخة من API مع التوكن المخزن
    this.api = new API("http://easyrentapi0.runasp.net/api/v1", {
      authToken: localStorage.getItem("token"),
    });
  }

  /**
   * الحصول على قائمة جميع الطلاب
   * @returns {Promise<Array>} قائمة الطلاب
   */
  async getAllStudents() {
    try {
      const response = await this.api.get("/api/Student/all");
      return response;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw new Error(error.message || "فشل في الحصول على بيانات الطلاب");
    }
  }

  /**
   * البحث عن طالب باستخدام معرف الطالب
   * @param {string} studentId معرف الطالب
   * @returns {Promise<Object>} بيانات الطالب
   */
  async getStudentById(studentId) {
    try {
      const response = await this.api.get(`/api/Student/${studentId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching student ${studentId}:`, error);
      throw new Error(error.message || "فشل في الحصول على بيانات الطالب");
    }
  }

  /**
   * البحث عن الطلاب باستخدام معايير محددة
   * @param {Object} criteria معايير البحث
   * @returns {Promise<Array>} قائمة الطلاب المطابقين
   */
  async searchStudents(criteria = {}) {
    try {
      const queryParams = new URLSearchParams(criteria).toString();
      const response = await this.api.get(`/api/Student/search?${queryParams}`);
      return response;
    } catch (error) {
      console.error("Error searching students:", error);
      throw new Error(error.message || "فشل في البحث عن الطلاب");
    }
  }

  /**
   * تحديث حالة التحقق من الطالب
   * @param {string} studentId معرف الطالب
   * @param {boolean} isVerified حالة التحقق
   * @returns {Promise<Object>} نتيجة التحديث
   */
  async updateStudentVerification(studentId, isVerified) {
    try {
      const response = await this.api.put(`/api/Student/${studentId}/verify`, {
        isVerified,
      });
      return response;
    } catch (error) {
      console.error(`Error updating student ${studentId} verification:`, error);
      throw new Error(error.message || "فشل في تحديث حالة التحقق من الطالب");
    }
  }

  /**
   * تحديث بيانات الطالب
   * @param {string} studentId معرف الطالب
   * @param {Object} data البيانات المحدثة
   * @returns {Promise<Object>} بيانات الطالب المحدثة
   */
  async updateStudent(studentId, data) {
    try {
      const response = await this.api.put(`/api/Student/${studentId}`, data);
      return response;
    } catch (error) {
      console.error(`Error updating student ${studentId}:`, error);
      throw new Error(error.message || "فشل في تحديث بيانات الطالب");
    }
  }
}

// تصدير نسخة واحدة من الكلاس للاستخدام في جميع أنحاء التطبيق
export const studentAPI = new StudentAPI();
