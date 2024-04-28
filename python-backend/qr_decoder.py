import cv2
from models import QRCode

def decode_qr_code():
    """
    Decode the provided QR code image using the webcam.
    """
    # Initialize webcam
    cap = cv2.VideoCapture(0)

    # Initialize QR code detector
    detector = cv2.QRCodeDetector()

    while True:
        # Capture frame from webcam
        ret, frame = cap.read()

        # Detect QR codes in the frame
        data, vertices, _ = detector.detectAndDecodeMulti(frame)

        if data:
            # Split data into email and unique key
            email, unique_key = data.split(",")

            # Check if student exists
            if QRCode.find_by_unique_key(unique_key):
                # Mark attendance
                result = QRCode.mark_attendance(unique_key)
                return jsonify(result), 200
            else:
                return jsonify({"error": "Student does not exist"}), 404

        # Display the frame
        cv2.imshow("QR Code Scanner", frame)

        # Check for key press to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release resources
    cap.release()
    cv2.destroyAllWindows()

    return jsonify({"error": "No QR code detected"}), 400
