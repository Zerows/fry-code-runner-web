require 'bunny'

namespace :rmq do
  task :publish => [:environment] do
    conn = Bunny.new(:host => "rabbitmq")
    conn.start
    ch = conn.create_channel
    s = Pad.new({filename: "HelloWorld.java", content: "public class HelloWorld { public static void main(String[] args){System.out.println(\"Hello, World Java\");}}", language: "java"})
    s.save!
    q = ch.queue("rpc_queue",{:auto_delete => false, durable: true, exclusive: false})
    q.publish(JSON.generate({jobId: s.id}), :routing_key => q.name)
    # close the connection
    ch.close
    conn.stop
  end
end
