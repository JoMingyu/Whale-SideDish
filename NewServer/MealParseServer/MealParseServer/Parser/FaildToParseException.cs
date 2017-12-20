using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolMeal
{
    /// <summary>
    /// 파싱에 실패하였을 경우 발생합니다.
    /// </summary>
    [Serializable]
    public class FaildToParseException : System.Exception
    {
        /// <summary>
        /// <see cref="FaildToParseException"/>클래스의 새 인스턴스를 초기화합니다.
        /// </summary>
        public FaildToParseException() { }

        /// <summary>
        /// 이 예외를 throw한 매개변수를 사용하여 <see cref="FaildToParseException"/>클래스의 새 인스턴스를 초기화합니다.
        /// </summary>
        /// <param name="message">예외를 발생시킨 매개변수의 이름입니다.</param>
        public FaildToParseException(string message) : base(message) { }

        /// <summary>
        /// 지정된 오류 메시지와 이 예외를 발생시킨 예외를 사용하여 <see cref="FaildToParseException"/>클래스의 새 인스턴스를 초기화합니다.
        /// </summary>
        /// <param name="message">이 예외의 원인을 설명하는 오류 메시지입니다.</param>
        /// <param name="inner">현재 예외를 발생시킨 예외입니다. 내부 예외를 지정하지 않은경우 null참조(Visual Basic의 경우 Nothing)입니다.</param>
        public FaildToParseException(string message, System.Exception inner) : base(message, inner) { }

        /// <summary>
        /// 지정된 오류 메시지와 이 예외를 throw한 매개변수의 이름을 사용하여 <see cref="FaildToParseException"/>클래스의 새 인스턴스를 초기화합니다.
        /// </summary>
        /// <param name="info">예외를 발생시킨 매개변수의 이름입니다.</param>
        /// <param name="context">오류를 설명하는 메시지입니다.</param>
        protected FaildToParseException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
